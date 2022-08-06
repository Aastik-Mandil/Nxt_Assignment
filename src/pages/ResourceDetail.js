import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import {
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Checkbox,
  Menu,
  MenuItem,
} from "@mui/material";
import { MdOutlineKeyboardArrowLeft, MdOutlineSort } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useHistory, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useDispatch } from "react-redux";
import {
  setResourceItem,
  setResponseMessage,
} from "../redux/reducers/basicReducer";

function ResourceDetail({ setIsAdd }) {
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const perPage = 6;
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [search, setSearch] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [resourceDetail, setResourceDetail] = useState(null);
  const [filteredResourceDetail, setFilteredResourceDetail] = useState(null);
  const [selectedResourceItems, setSelectedResourceItems] = useState([]);

  useEffect(() => {
    getResourceDetails();
  }, [params?.resourceId]);

  useEffect(() => {
    filterResourceItem();
  }, [search]);

  const getResourceDetails = () => {
    setLoad(true);
    const getResourceDetailsUrl = `${process.env.REACT_APP_BASE_URL}/website/react-assignment/resource/${params?.resourceId}.json`;
    const getResourceDetailsRequestParam = {
      method: "GET",
      //   headers: {
      // "Content-Type": "application/json",
      //   },
    };
    fetch(getResourceDetailsUrl, getResourceDetailsRequestParam)
      .then((res) => res.json())
      .then((data) => {
        setLoad(false);
        setResourceDetail(data);
        setFilteredResourceDetail(data);
      })
      .catch((err) => {
        setLoad(false);
      });
  };
  const addResourceItem = () => {
    dispatch(
      setResourceItem({
        title: "",
        description: "",
        link: "",
        resourceName: filteredResourceDetail?.title,
        icon_url: filteredResourceDetail?.icon_url,
      })
    );
    setIsAdd(true);
  };
  const updateResourceItem = () => {
    setLoad(true);
    const updateResourceItemUrl = `${process.env.REACT_APP_BASE_URL}/website/react-assignment/resource/update.json`;
    const updateResourceItemRequestParam = {
      method: "GET",
    };
    fetch(updateResourceItemUrl, updateResourceItemRequestParam)
      .then((res) => res.json())
      .then((data) => {
        setLoad(false);
        dispatch(
          setResponseMessage({
            open: true,
            status: "success",
            message: "Resource updated successfully",
          })
        );
      })
      .catch((err) => {
        setLoad(false);
        dispatch(
          setResponseMessage({
            open: true,
            status: "error",
            message: "Something went wrong",
          })
        );
      });
  };
  const deleteResourceItem = () => {
    setLoad(true);
    setResourceDetail({
      ...resourceDetail,
      resource_items: resourceDetail?.resource_items?.filter(
        (item) => !selectedResourceItems?.includes(item?.id)
      ),
    });
    setFilteredResourceDetail({
      ...filteredResourceDetail,
      resource_items: filteredResourceDetail?.resource_items?.filter(
        (item) => !selectedResourceItems?.includes(item?.id)
      ),
    });
    setSelectedResourceItems([]);
    dispatch(
      setResponseMessage({
        open: true,
        status: "success",
        message: "Resource Item removed successfully",
      })
    );
    setLoad(false);
  };
  const filterResourceItem = () => {
    setFilteredResourceDetail({
      ...resourceDetail,
      resource_items: resourceDetail?.resource_items?.filter(
        (item) =>
          item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.description?.toLowerCase()?.includes(search?.toLowerCase())
      ),
    });
  };

  return (
    <div>
      <Loading load={load} />

      <div
        onClick={() => {
          history.push("/");
        }}
        style={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <MdOutlineKeyboardArrowLeft
          style={{
            height: 18,
            width: 18,
          }}
        />

        <Typography style={{ fontSize: 12, fontWeight: 400, color: "#7e858e" }}>
          Resources
        </Typography>
      </div>

      <div style={{ marginTop: 20, display: "flex" }}>
        <div
          style={{
            width: 64,
            height: 64,
            border: "2px solid #D7DFE9",
            backgroundColor: "#FFFFFF",
            borderRadius: 32,
          }}
        >
          <img
            src={filteredResourceDetail?.icon_url}
            alt="logo"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: 32,
              padding: 6,
            }}
          />
        </div>

        <div
          style={{ display: "flex", flexDirection: "column", marginLeft: 16 }}
        >
          <Typography
            style={{ fontSize: 32, fontWeight: 400, color: "#171F46" }}
          >
            {filteredResourceDetail?.title}
          </Typography>

          <Typography
            style={{ fontSize: 16, fontWeight: 400, color: "#7E858E" }}
          >
            {filteredResourceDetail?.id}
          </Typography>

          <a href={filteredResourceDetail?.link} target="_blank">
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#0B69FF",
                cursor: "pointer",
              }}
            >
              {filteredResourceDetail?.link}
            </Typography>
          </a>
        </div>
      </div>

      <Typography
        style={{
          fontSize: 16,
          fontWeight: 400,
          color: "#7E858E",
          width: "90%",
          maxWidth: 552,
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "-webkit-box !important",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          whiteSpace: "normal",
          marginTop: 16,
        }}
      >
        {filteredResourceDetail?.description}
      </Typography>

      <Button
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#0b69ff",
          borderRadius: 4,
          marginTop: 16,
          padding: "8px 20px",
        }}
        onClick={updateResourceItem}
      >
        Update
      </Button>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography style={{ fontSize: 24, fontWeight: 400, color: "#171F46" }}>
          Items
        </Typography>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              border: "1px solid #D7DFE9",
              width: "90%",
              maxWidth: 648,
              padding: "6px 10px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 3,
              marginRight: 12,
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

          <div>
            <Button
              variant="text"
              startIcon={<MdOutlineSort />}
              color="inherit"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            >
              Sort
            </Button>

            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => {
                setAnchorEl(null);
              }}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <MenuItem
                style={{ width: "100%" }}
                onClick={() => {
                  var filteredResourceItems = [
                    ...filteredResourceDetail?.resource_items,
                  ];
                  filteredResourceItems?.sort(
                    (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
                  );
                  setFilteredResourceDetail({
                    ...filteredResourceDetail,
                    resource_items: [...filteredResourceItems],
                  });
                  setAnchorEl(null);
                }}
              >
                Recently Added
              </MenuItem>

              <MenuItem
                style={{ width: "100%" }}
                onClick={() => {
                  var filteredResourceItems = [
                    ...filteredResourceDetail?.resource_items,
                  ];
                  filteredResourceItems?.sort((a, b) =>
                    a?.title > b?.title ? 1 : a?.title < b?.title ? -1 : 0
                  );
                  setFilteredResourceDetail({
                    ...filteredResourceDetail,
                    resource_items: [...filteredResourceItems],
                  });
                  setAnchorEl(null);
                }}
              >
                Ascending
              </MenuItem>

              <MenuItem
                style={{ width: "100%" }}
                onClick={() => {
                  var filteredResourceItems = [
                    ...filteredResourceDetail?.resource_items,
                  ];
                  filteredResourceItems?.sort((a, b) =>
                    a?.title < b?.title ? 1 : a?.title > b?.title ? -1 : 0
                  );
                  setFilteredResourceDetail({
                    ...filteredResourceDetail,
                    resource_items: [...filteredResourceItems],
                  });
                  setAnchorEl(null);
                }}
              >
                Descending
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>

      <TableContainer component={Paper} style={{ marginTop: 24 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"></TableCell>

              <TableCell
                style={{ fontSize: 12, fontWeight: 600, color: "#7E858E" }}
              >
                TITLE
              </TableCell>

              <TableCell
                style={{ fontSize: 12, fontWeight: 600, color: "#7E858E" }}
              >
                DESCRIPTION
              </TableCell>

              <TableCell
                style={{ fontSize: 12, fontWeight: 600, color: "#7E858E" }}
              >
                LINK
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredResourceDetail?.resource_items
              ?.slice((page - 1) * perPage, page * perPage)
              ?.map((item, ind) => (
                <TableRow key={ind}>
                  <TableCell align="center">
                    <Checkbox
                      checked={selectedResourceItems?.includes(item?.id)}
                      onClick={() => {
                        if (selectedResourceItems?.includes(item?.id)) {
                          setSelectedResourceItems(
                            selectedResourceItems?.filter(
                              (item_id) => item_id !== item?.id
                            )
                          );
                        } else {
                          setSelectedResourceItems([
                            ...selectedResourceItems,
                            item?.id,
                          ]);
                        }
                      }}
                    />
                  </TableCell>

                  <TableCell
                    style={{ fontSize: 14, fontWeight: 400, color: "#7E858E" }}
                  >
                    {item?.title}
                  </TableCell>

                  <TableCell>
                    <Typography
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#7E858E",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: 400,
                      }}
                    >
                      {item?.description}
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <a
                      href={item?.link}
                      target="_blank"
                      style={{
                        fontSize: 14,
                        fontWeight: 400,
                        color: "#0B69FF",
                        cursor: "pointer",
                      }}
                    >
                      {item?.link}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor:
                selectedResourceItems?.length > 0 ? "#D7DFE9" : "#2dca73",
              borderRadius: 4,
              marginTop: 16,
              padding: "8px 20px",
            }}
            disabled={selectedResourceItems?.length > 0}
            onClick={addResourceItem}
          >
            Add Item
          </Button>

          <Button
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#ffffff",
              backgroundColor:
                selectedResourceItems?.length === 0 ? "#D7DFE9" : "#ff0b37",
              borderRadius: 4,
              marginTop: 16,
              padding: "8px 20px",
              marginLeft: 16,
            }}
            disabled={selectedResourceItems?.length === 0}
            onClick={deleteResourceItem}
          >
            Delete
          </Button>
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => {
            setPage(e?.selected);
          }}
          pageRangeDisplayed={2}
          pageCount={Math.ceil(
            filteredResourceDetail?.resource_items?.length / perPage
          )}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </div>
  );
}

export default ResourceDetail;
