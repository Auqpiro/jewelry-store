import { useDispatch, useSelector } from "react-redux";
import { fetchIdsAll } from "@store/slices/items";
import { selectFilterType } from "@store/slices/filter";
import { Accordion, Button, Container } from "react-bootstrap";
import Search from "@components/Filter/Search";
import Select from "@components/Filter/Select";
import Range from "@components/Filter/Range";
import { appDispatch, rootState } from "@store/index";

function PanelFilter() {
  const type = useSelector((state: rootState) => state.filter.type);

  const dispatch = useDispatch<appDispatch>();

  const onClick = () => {
    const controller = new AbortController();
    dispatch(selectFilterType(null));
    dispatch(fetchIdsAll(controller.signal));
  };

  const isFetch = useSelector((state: rootState) => {
    const { items, ids } = state.items.isFetching;
    return items || ids;
  });

  return (
    <section>
      <Container className="py-2 h6">Фильтрация
      </Container>
      <Accordion defaultActiveKey="0">
        <Search />
        <Select />
        <Range />
      </Accordion>
      <Button disabled={isFetch || !type} onClick={onClick} className="mt-3" variant="outline-primary" size="sm">
        СБРОС
      </Button>
    </section>
  );
}

export default PanelFilter;
