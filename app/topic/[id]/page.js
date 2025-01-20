import TopicExercises from "@/components/TopicExercises";
import React from "react";

const page = async ({ params }) => {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <TopicExercises topicId={id} />
    </div>
  );
};

export default page;
