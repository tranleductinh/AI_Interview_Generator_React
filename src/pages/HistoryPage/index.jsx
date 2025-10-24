import React, { useEffect, useState } from "react";
import HistoryHeader from "@/components/HistoryHeader";
import HistoryList from "@/components/HistoryList";
import DialogInterview from "@/components/DialogInterview";

const HistoryPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState(
    localStorage.getItem("data_interview")
      ? JSON.parse(localStorage.getItem("data_interview"))
      : []
  );
  const [dataFilter, setDataFilter] = useState(
    localStorage.getItem("data_interview")
      ? JSON.parse(localStorage.getItem("data_interview"))
      : []
  );
  const [getDataByID, setGetDataByID] = useState([]);
  const handleOpen = (id) => {
    setOpenDialog(true);
    setGetDataByID(data.filter((item) => item.id === id));
  };

  useEffect(() => {
    setGetDataByID(getDataByID);
  }, [getDataByID]);

  const handleDeleteAll = () => {
    localStorage.removeItem("data_interview");
    setData([]);
  };
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setDataFilter(data.filter((item) => item.id !== id));
    localStorage.setItem("data_interview", JSON.stringify(data));
  }
  const handleSearch = (value) => {
    console.log("value", value);
    if (value) {
      setDataFilter(
        data.filter(
          (item) =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.level.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setDataFilter(data);
    }
    console.log("dataFilter", dataFilter);
  };
 

  return (
    <div>
      <HistoryHeader
        handleDeleteAll={handleDeleteAll}
        handleSearch={handleSearch}
      />
      <HistoryList handleOpenDialog={handleOpen} data={data} handleDelete={handleDelete}/>
      <DialogInterview open={openDialog} onOpenChange={setOpenDialog} data={getDataByID}/>
    </div>
  );
};

export default HistoryPage;
