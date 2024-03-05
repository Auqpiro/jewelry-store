import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIdsFilter, selectFilterType } from "@store/slices/filter";
import { Accordion, Form } from "react-bootstrap";
import { appDispatch, rootState } from "@store/index";

const currentFilterType = "brand";

function Select() {
  const type = useSelector((state: rootState) => state.filter.type);

  const options = useSelector((state: rootState) => {
    const { brand } = state.filter.options;
    return brand as string[];
  });

  const dispatch = useDispatch<appDispatch>();

  const onSelect = () => dispatch(selectFilterType(currentFilterType));

  const [option, setOption] = useState("");
  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (currentFilterType !== type && option) {
      dispatch(selectFilterType(currentFilterType));
    }
    setOption(event.target.value);
  };

  useEffect(() => {
    if (currentFilterType !== type || !option) {
      return;
    }
    const controller = new AbortController();
    dispatch(fetchIdsFilter({ search: option, abortSignal: controller.signal }));
    return () => controller.abort();
  }, [dispatch, type, option]);

  const optionRef = useRef<HTMLOptionElement | null>(null);
  useEffect(() => {
    if (optionRef.current && !type) {
      setOption("");
      optionRef.current.selected = true;
    }
    if (optionRef.current && type && currentFilterType !== type) {
      setOption("");
      optionRef.current.selected = true;
    }
  }, [type]);

  return (
    <Accordion.Item eventKey="1">
      <article>
        <Accordion.Header onClick={onSelect}>Бренды</Accordion.Header>
        <Accordion.Body>
          <Form.Label htmlFor={currentFilterType}>выберите бренд</Form.Label>
          <Form.Select defaultValue="DEFAULT" name={currentFilterType} id={currentFilterType} onChange={onChange}>
            <option value="DEFAULT" disabled ref={optionRef}></option>
            {options.length &&
              options.map((optionValue) => (
                <option key={optionValue} value={optionValue}>
                  {optionValue}
                </option>
              ))}
          </Form.Select>
        </Accordion.Body>
      </article>
    </Accordion.Item>
  );
}

export default Select;
