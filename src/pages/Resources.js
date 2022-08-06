import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { AiOutlineSearch } from "react-icons/ai";
import CustomTab from "../components/CustomTab";
import Headers from "../components/Headers";
import ResourceCard from "../components/ResourceCard";
import Loading from "../components/Loading";

function Resources() {
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    setFilteredResources(
      resources?.filter(
        (resource) =>
          resource?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          resource?.description
            ?.toLowerCase()
            ?.includes(search?.toLowerCase()) ||
          resource?.category?.toLowerCase()?.includes(search?.toLowerCase())
      )
    );
  }, [search]);

  const getResources = () => {
    setLoad(true);
    const getResourcesUrl = `https://media-content.ccbp.in/website/react-assignment/resources.json`;
    const getResourcesRequestParam = {
      method: "GET",
      // headers: {
      //   "Content-Type": "application/json",
      //   "Access-Control-Allow-Origin": "*",
      // },
    };
    fetch(getResourcesUrl, getResourcesRequestParam)
      .then((res) => res.json())
      .then((data) => {
        setLoad(false);
        setResources(data);
        setFilteredResources(data);
      })
      .catch((err) => {
        setLoad(false);
      });
  };

  return (
    <div>
      <Loading load={load} />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 28,
        }}
      >
        <CustomTab
          text="Resources"
          selected={tag === ""}
          css={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
          onClick={() => {
            setTag("");
          }}
        />

        <CustomTab
          text="Requests"
          selected={tag === "request"}
          css={{}}
          onClick={() => {
            setTag("request");
          }}
        />

        <CustomTab
          text="Users"
          selected={tag === "user"}
          css={{ borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
          onClick={() => {
            setTag("user");
          }}
        />
      </div>

      <div
        style={{
          border: "1px solid #D7DFE9",
          width: "90%",
          maxWidth: 648,
          padding: "6px 10px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffffff",
          marginTop: 28,
          borderRadius: 3,
        }}
      >
        <AiOutlineSearch />

        <input
          style={{ flex: 1, marginLeft: 4 }}
          placeholder="Search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: 16,
        }}
      >
        {filteredResources
          ?.filter((resource) => resource?.tag?.includes(tag))
          ?.map((resource, index) => (
            <Grid key={index} item xs={12} md={6} lg={4}>
              <ResourceCard resource={resource} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}

export default Resources;
