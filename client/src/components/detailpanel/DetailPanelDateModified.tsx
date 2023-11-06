type Props = {
  formatedModifiedDate: string | undefined;
};

function DetailPanelDateModified({ formatedModifiedDate }: Props) {
  return (
    <p className='text-xs dark:text-dark-secondary-color'>
      This information was last modified on {formatedModifiedDate}
    </p>
  );
}

export default DetailPanelDateModified;
