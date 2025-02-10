import Link from 'next/link';
import { Icon } from '../icons';
import pizza_logo from '../../../public/favicon.png';
const Footer = () => {
  const topics = [
    {
      title: 'Asociate con nosotros',
      list: [
        {
          title: 'Converti tu local en un bodado de barrio',
          disabled: false,
          link: '',
        },
        {
          title: 'Hacete repartidor socio de Bocado de Barrio',
          disabled: true,
          link: '',
        },
      ],
    },
    {
      title: 'Informacion de la empresa',
      list: [
        {
          title: 'Acerca de Bocado De Barrio',
          disabled: false,
          link: '',
        },
        {
          title: 'Contactanos',
          disabled: false,
          link: '',
        },
      ],
    },
    {
      title: 'Seguinos en nuestrar redes',
      list: [
        {
          title: 'facebook',
          disabled: true,
          link: '#',
          logo: <Icon.Facebook />,
        },
        {
          title: 'instagram',
          disabled: true,
          link: '#',
          logo: <Icon.Instagram />,
        },
        {
          title: 'Youtube',
          disabled: true,
          link: '#',
          logo: <Icon.Youtube />,
        },
      ],
    },
  ];

  return (
    <>
      <footer className='bg-white'>
        <div className='layout-container border-gray-light flex flex-col items-center gap-4 border-y p-11 md:flex-row md:items-start md:justify-around'>
          <div className='flex w-full max-w-sm items-center justify-center'>
            <img src={pizza_logo} alt='' />
          </div>

          {topics.map((topic) => (
            <article key={topic.title} className='w-full max-w-sm px-3'>
              <h3 className='font-semibold'>{topic.title}</h3>
              <ul className={`${topic.list[0].logo && 'flex'} my-3 md:my-10`}>
                {topic.list.map((link) => (
                  <li
                    key={link.title}
                    className={`px-2 py-1 ${
                      !link.logo && !link.disabled
                        ? 'duration-300 hover:text-green-500 hover:underline'
                        : 'text-gray-300'
                    } md:text-sm`}
                  >
                    {!link.disabled ? (
                      <Link href={link.link}>{link.logo ?? link.title}</Link>
                    ) : (
                      <span className='text-gray-light'>
                        {link.logo ?? link.title}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className='p-4 text-center'>
          © {new Date().getFullYear()} Copyright{' '}
          <Link
            href='https://leoda.vercel.app/'
            target='_blank'
            className='hover:text-green underline duration-300'
          >
            Leoda
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
