function About() {
  return (
    <div className='mx-auto mt-20 w-full max-w-6xl px-4 md:px-4'>
      <h3 className='mb-4 text-2xl text-light-primary-color dark:text-dark-primary-color'>
        About.
      </h3>
      <h2 className='mb-4 text-lg'>
        This website was built as a bit of fun by me.
      </h2>
      <p className='mt-4'>
        The information used was copied from the Brighton and Hove County
        Council webpage that lists the addresses and opening times for public
        toilets in the Brighton and Hove area which can be found here (all
        rights reserved):{' '}
        <a
          href='https://www.brighton-hove.gov.uk/libraries-leisure-and-arts/public-toilets/list-public-toilets-brighton-hove'
          target='_blank'
          rel='noopener noreferrer'
          className='light-primary-color text-light-secondary-color dark:text-dark-secondary-color'
        >
          https://www.brighton-hove.gov.uk/libraries-leisure-and-arts/public-toilets/list-public-toilets-brighton-hove
        </a>
        .
      </p>
      <p className='mt-4'>
        I built this because I wanted to build something in{' '}
        <a
          href='https://www.typescriptlang.org/'
          target='_blank'
          rel='noopener noreferrer'
          className='light-primary-color text-light-secondary-color dark:text-dark-secondary-color'
        >
          {' '}
          TypeScript{' '}
        </a>{' '}
        using
        <a
          href='https://react.dev/'
          target='_blank'
          rel='noopener noreferrer'
          className='light-primary-color text-light-secondary-color dark:text-dark-secondary-color'
        >
          {' '}
          React{' '}
        </a>{' '}
        and{' '}
        <a
          href='https://tailwindcss.com/'
          target='_blank'
          rel='noopener noreferrer'
          className='light-primary-color text-light-secondary-color dark:text-dark-secondary-color'
        >
          {' '}
          TailwindCSS{' '}
        </a>
        .{' '}
      </p>
      <p className='mt-4'>
        If you are interested the code is avaialable{' '}
        <a
          href='https://github.com/edickins/toiletFinderWebsite'
          target='_blank'
          rel='noopener noreferrer'
          className='light-primary-color text-light-secondary-color dark:text-dark-secondary-color'
        >
          here
        </a>{' '}
        and you are welcome to use it howerver you wish. .{' '}
      </p>
      <p className='mt-4'>
        If you have any questions or wish to know more please get in contact at{' '}
        <a
          href='mailto:ed.dickins@bleepbloop.net'
          className='light-primary-color text-light-secondary-color dark:text-dark-secondary-color'
        >
          ed.dickins@bleepbloop.net
        </a>
      </p>
    </div>
  );
}

export default About;
