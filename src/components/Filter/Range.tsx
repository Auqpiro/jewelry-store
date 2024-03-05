import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@hooks/useDebounce";
import { fetchIdsFilter, selectFilterType } from "@store/slices/filter";
import { Accordion, Form } from "react-bootstrap";
import { appDispatch, rootState } from "@store/index";

const currentFilterType = "price";

function Range() {
  const type = useSelector((state: rootState) => state.filter.type);

  const prices = useSelector((state: rootState) => {
    const { price } = state.filter.options;
    return price as number[];
  });

  const dispatch = useDispatch<appDispatch>();

  const onSelect = () => dispatch(selectFilterType(currentFilterType));

  const [price, setPrice] = useState(0);
  const [isTouched, setTouch] = useState(false);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentFilterType !== type) {
      dispatch(selectFilterType(currentFilterType));
    }
    setTouch(true);
    setPrice(prices[Number(event.target.value)]);
  };

  const debouncedRange = useDebounce(0, price, 1000);
  useEffect(() => {
    if (currentFilterType !== type) {
      return;
    }
    const controller = new AbortController();
    if (isTouched && debouncedRange) {
      dispatch(fetchIdsFilter({ search: debouncedRange, abortSignal: controller.signal }));
    }
    return () => controller.abort();
  }, [dispatch, type, debouncedRange, isTouched]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current && !type) {
      setPrice(prices[Math.round(prices.length / 2)] || 0);
      inputRef.current.value = Math.round(prices.length / 2).toString();
      setTouch(false);
    }
    if (inputRef.current && type && currentFilterType !== type) {
      setPrice(prices[Math.round(prices.length / 2)] || 0);
      inputRef.current.value = Math.round(prices.length / 2).toString();
      setTouch(false);
    }
  }, [type, prices]);

  return (
    <Accordion.Item eventKey="2">
      <article>
        <Accordion.Header onClick={onSelect}>Цены</Accordion.Header>
        <Accordion.Body>
          <div>
            <Form.Label htmlFor={currentFilterType}>{price} р.</Form.Label>
          </div>
          <Form.Range
            id={currentFilterType}
            name={currentFilterType}
            ref={inputRef}
            min={0}
            max={prices.length - 1 || 0}
            step={1}
            onChange={onChange}
          />
        </Accordion.Body>
      </article>
    </Accordion.Item>
  );
}

export default Range;
