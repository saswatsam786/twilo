import React, { useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";

const Search = () => {
  const [search, setSearch] = useState("");
  return (
    <Form style={{ position: "relative", margin: "0 auto" }}>
      <Input
        type="text"
        name="search"
        onChange={(e) =>
          setSearch(e.target.value.toLowerCase().replace(/ /g, ""))
        }
        value={search}
        id="search"
        placeholder="Search"
        style={{
          backgroundColor: "white",
          borderRadius: "5px",
          boxShadow: "2px 2px 10px",
          padding: "2px 2px 2px 30px",
          paddingLeft: "25px",
        }}
      />
      <SearchInput style={{ position: "absolute", top: "0" }}>
        <SearchIcon />
      </SearchInput>
    </Form>
  );
};

const Form = styled.div``;

const Input = styled.input``;

const SearchInput = styled.div``;

export default Search;
