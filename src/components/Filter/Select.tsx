import { useDispatch, useSelector } from "react-redux";
import { fetchIdsFilter, selectFilterType } from "@store/slices/filter";
import { appDispatch, rootState } from "@store/index";
import { ChangeEvent, useEffect, useRef, useState } from "react";

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
    if (currentFilterType !== type) {
      dispatch(selectFilterType(currentFilterType));
    }
    setOption(event.target.value);
  };

  useEffect(() => {
    if (currentFilterType !== type) {
      return;
    }
    dispatch(fetchIdsFilter(option));
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
    <div>
      <label htmlFor={currentFilterType} onClick={onSelect}>
        {currentFilterType === type ? "!" : ""}Select
      </label>
      <br />
      <select defaultValue={'DEFAULT'} name={currentFilterType} id={currentFilterType} onChange={onChange}>
        <option value={"DEFAULT"} disabled ref={optionRef}>
          select option
        </option>
        {options.length && options.map((optionValue) => <option key={optionValue} value={optionValue}>{optionValue}</option>)}
      </select>
    </div>
  );
}

export default Select;
