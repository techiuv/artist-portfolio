import { Helmet } from "react-helmet-async";

const Title = ({ title = "Artist Portfolio - Yuvraj" }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Title;
