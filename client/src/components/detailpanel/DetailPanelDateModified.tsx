type Props = {
  formatedModifiedDate: string | undefined;
};

function DetailPanelDateModified({ formatedModifiedDate }: Props) {
  return (
    <p
      id='detail-panel-last-modified'
      className='col-span-1 mb-10 text-xs text-light-primary-color dark:text-dark-secondary-color md:col-span-2 md:mb-0 md:self-end'
    >
      This information was last modified on {formatedModifiedDate}
    </p>
  );
}

export default DetailPanelDateModified;
