import React from "react";
import SparkReveal from "~/components/spark/reveal";
import SparkAbout from "~/components/spark/SparkAbout";
import SparkFooter from "~/components/spark/SparkFooter";
import SparkGallery from "~/components/spark/SparkGallery";
import SparkLanding from "~/components/spark/SparkLanding";
import ArtistPage from "~/components/Artist/Artist";

const SparkPage = () => {
  return (
    <div className="overflow-x-hidden">
      <SparkLanding/>
      <SparkAbout/>
      <ArtistPage/>
      <SparkReveal/>
      <SparkGallery />
      <SparkFooter />
    </div>
  );
};

export default SparkPage;
