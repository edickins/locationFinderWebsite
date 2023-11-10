type Props = {
  icon: string;
  isActive: boolean | undefined;
};

function ButtonActiveIcon({ icon, isActive }: Props) {
  const base64Svg = `data:image/svg+xml;base64,${btoa(icon)}`;

  return (
    <div className='ml-1 inline-block h-4 w-4 bg-transparent'>
      {isActive ? (
        <img
          src={base64Svg}
          alt='active button indicator'
          className='h-full w-full'
        />
      ) : (
        <div className='h-full w-full' />
      )}
    </div>
  );
}

export default ButtonActiveIcon;
