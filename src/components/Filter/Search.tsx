import { appDispatch, rootState } from "@store/index";
import { fetchIdsFilter, selectFilterType } from "@store/slices/filter";
import { useDebounce } from "@hooks/useDebounce";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIdsAll } from "@store/slices/items";

const currentFilterType = "product";

function Search() {
  const type = useSelector((state: rootState) => state.filter.type);

  const dispatch = useDispatch<appDispatch>();

  const onSelect = () => dispatch(selectFilterType(currentFilterType));

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    /*
    keep this event handler
    when the user calls the form to submit using the Enter key
    it will lead to nothing
    by this time the useEffect will work with debouncedSearch and the search will go
    */
  };

  const [search, setSearch] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentFilterType !== type) {
      dispatch(selectFilterType(currentFilterType));
    }
    console.log(event.target.value);

    setSearch(event.target.value);
  };

  const debouncedSearch = useDebounce(search, 1000);
  useEffect(() => {
    if (!debouncedSearch) {
      dispatch(fetchIdsAll());
    } else {
      dispatch(fetchIdsFilter(debouncedSearch));
    }
  }, [dispatch, debouncedSearch]);

  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (formRef.current && !type) {
      formRef.current.reset();
    }
    if (formRef.current && type && currentFilterType !== type) {
      formRef.current.reset();
    }
  }, [type]);

  return (
    <div>
      <div onClick={onSelect}>{currentFilterType === type ? "!" : ""}Search</div>
      <form ref={formRef} onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />
      </form>
    </div>
  );
}

export default Search;
