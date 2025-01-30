import React from "react";
import WavingHandOutlinedIcon from "@mui/icons-material/WavingHandOutlined";
import ProfileCard from "./ProfileCard";

export default function DefaultStudentBage() {
  return (
    <>
      <h2>
        أهلا بك في حلقتك القرآنية
        <WavingHandOutlinedIcon />
      </h2>
      <ProfileCard />
    </>
  );
}
