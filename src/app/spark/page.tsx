import React from "react";
import SparkAbout from "~/components/spark/SparkAbout";
import SparkFooter from "~/components/spark/SparkFooter";
import SparkGallery from "~/components/spark/SparkGallery";
import SparkLanding from "~/components/spark/SparkLanding";

const SparkPage = () => {
  return (
    <div className="">
      <SparkLanding/>
      <SparkAbout/>
      <SparkGallery />
      <SparkFooter />
    </div>
  );
};

export default SparkPage;
