import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setResponseMessage } from "../redux/reducers/basicReducer";
import Loading from "../components/Loading";

function ItemDetail({ setIsAdd }) {
  const dispatch = useDispatch();
  const basicReducerState = useSelector((state) => state.basicReducer);
  const [load, setLoad] = useState(false);
  const [resItem, setResItem] = useState(null);
  const [error, setError] = useState({
    title: { isError: false, message: "" },
    links: { isError: false, message: "" },
    description: { isError: false, message: "" },
  });

  useEffect(() => {
    setResItem(basicReducerState?.resourceItem);
  }, [basicReducerState?.resourceItem]);

  const addNewResourceItem = () => {
    if (!validateField()) {
      return;
    }
    setLoad(true);
    const addNewResourceItemUrl = `${process.env.REACT_APP_BASE_URL}/website/react-assignment/add_resource.json`;
    const addNewResourceItemRequestParam = {
      method: "GET",
    };
    fetch(addNewResourceItemUrl, addNewResourceItemRequestParam)
      .then((res) => res.json())
      .then((data) => {
        setLoad(false);
        dispatch(
          setResponseMessage({
            open: true,
            status: "success",
            message: "Resource Item added successfully",
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
  const validateField = () => {
    setError({
      ...error,
      title: {
        isError: resItem?.title?.length === 0 ? true : false,
        message: resItem?.title?.length === 0 ? "Please fill it" : "",
      },
      link: {
        isError: resItem?.link?.length === 0 ? true : false,
        message: resItem?.link?.length === 0 ? "Please fill it." : "",
      },
      description: {
        isError: resItem?.description?.length === 0 ? true : false,
        message: resItem?.description?.length === 0 ? "Please fill it." : "",
      },
    });
    return (
      resItem?.title?.length !== 0 &&
      resItem?.link?.length !== 0 &&
      resItem?.description?.length !== 0
    );
  };

  return (
    <>
      <Loading load={load} />

      <Grid container spacing={2} style={{ height: "93vh" }}>
        <Grid item xs={6}>
          <div
            onClick={() => {
              setIsAdd(false);
              // history.push(`/resource/${param?.resourceId}`);
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

            <Typography
              style={{ fontSize: 12, fontWeight: 400, color: "#7e858e" }}
            >
              Users
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "30px",
              height: "90%",
            }}
          >
            <Typography
              style={{
                fontSize: 32,
                fontWeight: 400,
                color: "#171f46",
                margin: "16px 0px",
              }}
            >
              Item Details
            </Typography>

            <div style={{ margin: "12px 0px" }}>
              <Typography
                style={{
                  fontSize: 12,
                  fontWight: 600,
                  color: "#7E858E",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Item Name
              </Typography>

              <TextField
                variant="outlined"
                style={{ backgroundColor: "#FFFFFF" }}
                value={resItem?.title}
                size="small"
                onChange={(e) => {
                  setResItem({ ...resItem, title: e.target.value });
                  setError({
                    ...error,
                    title: {
                      isError: e.target.value === 0 ? true : false,
                      message: e.target.value === 0 ? "Please fill it." : "",
                    },
                  });
                }}
                error={error?.title?.isError}
                helperText={error?.title?.message}
              />
            </div>

            <div style={{ margin: "12px 0px" }}>
              <Typography
                style={{
                  fontSize: 12,
                  fontWight: 600,
                  color: "#7E858E",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Link
              </Typography>

              <TextField
                variant="outlined"
                style={{ backgroundColor: "#FFFFFF" }}
                value={resItem?.link}
                size="small"
                onChange={(e) => {
                  setResItem({ ...resItem, link: e.target.value });
                  setError({
                    ...error,
                    link: {
                      isError: e.target.value === 0 ? true : false,
                      message: e.target.value === 0 ? "Please fill it." : "",
                    },
                  });
                }}
                error={error?.link?.isError}
                helperText={error?.link?.message}
              />
            </div>

            <div style={{ margin: "12px 0px" }}>
              <Typography
                style={{
                  fontSize: 12,
                  fontWight: 600,
                  color: "#7E858E",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Resource Name
              </Typography>

              <TextField
                variant="outlined"
                style={{ backgroundColor: "#FFFFFF" }}
                value={resItem?.resourceName}
                size="small"
                // onChange={(e) => {
                //     setResItem({ ...resItem, resourceName: e.target.value });
                // }}
              />
            </div>

            <div style={{ margin: "12px 0px" }}>
              <Typography
                style={{
                  fontSize: 12,
                  fontWight: 600,
                  color: "#7E858E",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Description
              </Typography>

              <TextField
                variant="outlined"
                multiline
                style={{ backgroundColor: "#FFFFFF" }}
                value={resItem?.description}
                size="small"
                onChange={(e) => {
                  setResItem({ ...resItem, description: e.target.value });
                  setError({
                    ...error,
                    description: {
                      isError: e.target.value === 0 ? true : false,
                      message: e.target.value === 0 ? "Please fill it." : "",
                    },
                  });
                }}
                error={error?.description?.isError}
                helperText={error?.description?.message}
              />
            </div>

            <Button
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#ffffff",
                backgroundColor: "#0B69FF",
                borderRadius: 4,
                marginTop: 16,
                padding: "8px 20px",
              }}
              onClick={addNewResourceItem}
              // disabled={
              //   resItem?.title?.length === 0 ||
              //   resItem?.link?.length === 0 ||
              //   resItem?.description?.length === 0
              // }
            >
              Create
            </Button>
          </div>
        </Grid>

        <Grid item xs={6}>
          <img
            src={resItem?.icon_url}
            alt=""
            style={{ width: "100%", height: "100%" }}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ItemDetail;
