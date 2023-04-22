import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <TailSpin
      height="60"
      width="60"
      color="#fff"
      ariaLabel="tail-spin-loading"
      radius="1"
      wrapperStyle={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: '1200',
      }}
      wrapperClass=""
      visible={true}
    />
  );
};

export default Loader;
