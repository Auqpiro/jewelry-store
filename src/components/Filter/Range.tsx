import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@hooks/useDebounce";
import { fetchIdsFilter, selectFilterType } from "@store/slices/filter";
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
    if (isTouched && debouncedRange) {
      dispatch(fetchIdsFilter(debouncedRange));
    }
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
    <div>
      <label htmlFor={currentFilterType} onClick={onSelect}>
        {currentFilterType === type ? "!" : ""}Range
      </label>
      <div>{price}</div>
      <input
        type="range"
        id={currentFilterType}
        name={currentFilterType}
        ref={inputRef}
        min={0}
        max={prices.length - 1 || 0}
        step={1}
        onChange={onChange}
      />
    </div>
  );
}

export default Range;
