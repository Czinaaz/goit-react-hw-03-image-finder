import { MutatingDots } from 'react-loader-spinner';
const Loader = () => {
  return (
    <MutatingDots
      height="200"
      width="200"
      color="#FFFF00"
      secondaryColor="#0000FF"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
export { Loader };