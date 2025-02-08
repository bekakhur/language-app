import Header from "@/components/Header";
import TopicExercises from "@/components/TopicExercises";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <>
      <Header />
      <div className="min-h-screen mb-10">
        <TopicExercises topicId={id} />
      </div>
    </>
  );
};

export default page;
