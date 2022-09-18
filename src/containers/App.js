import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import "./App.css";

import { setSearchField, requestRobots } from "../actions";

const App = () => {
  const dispatch = useDispatch();
  const { searchField } = useSelector((state) => state.searchRobots);
  const { robots, isPending, error } = useSelector(
    (state) => state.requestRobots
  );

  const onRequestRobots = useCallback(
    () => dispatch(requestRobots()),
    [dispatch]
  );

  useEffect(() => {
    onRequestRobots();
  }, [onRequestRobots]);

  const onSearchChange = (event) =>
    dispatch(setSearchField(event.target.value));

  const filteredRobots = robots.filter((robot) =>
    robot.name.toLowerCase().includes(searchField)
  );

  if (isPending) return <h1>Loading</h1>;

  if (error) return <h1>There was an error, try again later</h1>;

  return (
    <div className="tc">
      <h1 className="f2">RoboFriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <CardList robots={filteredRobots} />
      </Scroll>
    </div>
  );
};

export default App;
