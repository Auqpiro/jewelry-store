import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchIdsAll } from "@store/slices/items";
import { Outlet } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import Logo from "@components/Logo";
import { appDispatch } from "@store/index";
import { selectFilterType } from "@store/slices/filter";

function Layout() {
  const [click, setClick] = useState(0);
  const onClick = () => setClick((prev) => prev + 1);

  const dispatch = useDispatch<appDispatch>();
  useEffect(() => {
    if (!click) {
      return;
    }
    dispatch(selectFilterType(null));
    const controller = new AbortController();
    dispatch(fetchIdsAll(controller.signal));
    return () => controller.abort();
  }, [dispatch, click]);

  return (
    <>
      <header>
        <Navbar>
          <Container>
            <Navbar.Brand href="#" onClick={onClick}>
              <Logo />
              JEWELRY STORE
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <Outlet />
    </>
  );
}

export default Layout;
