import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@hooks/useDebounce";
import { fetchIdsFilter, selectFilterType } from "@store/slices/filter";
import { appDispatch, rootState } from "@store/index";

const currentFilterType = "product";

function Search() {
  const type = useSelector((state: rootState) => state.filter.type);

  const dispatch = useDispatch<appDispatch>();

  const onSelect = () => dispatch(selectFilterType(currentFilterType));

  const [search, setSearch] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentFilterType !== type) {
      dispatch(selectFilterType(currentFilterType));
    }
    setSearch(event.target.value);
  };

  const debouncedSearch = useDebounce("", search, 1000);
  useEffect(() => {
    if (currentFilterType !== type) {
      return;
    }
    const controller = new AbortController();
    if (debouncedSearch) {
      dispatch(fetchIdsFilter({ search: debouncedSearch, abortSignal: controller.signal }));
    }
    return () => controller.abort();
  }, [dispatch, debouncedSearch, type]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current && !type) {
      inputRef.current.value = "";
    }
    if (inputRef.current && type && currentFilterType !== type) {
      inputRef.current.value = "";
    }
  }, [type]);

  return (
    <div>
      <label htmlFor={currentFilterType} onClick={onSelect}>
        {currentFilterType === type ? "!" : ""}Search
      </label>
      <br />
      <input type="text" id={currentFilterType} name={currentFilterType} ref={inputRef} onChange={onChange} />
    </div>
  );
}

export default Search;
