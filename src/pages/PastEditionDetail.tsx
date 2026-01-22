import { useParams } from "react-router-dom";

const PastEditionDetail = () => {
  const { year } = useParams<{ year: string }>();

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-8">
          {year}
        </h1>
      </div>
    </div>
  );
};

export default PastEditionDetail;
