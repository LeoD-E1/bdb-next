export interface Item {
  title: string;
  bgColor: string;
  description: string;
  imageUrl: string;
}

const FeatureCard: React.FC<Item> = ({
  bgColor,
  description,
  imageUrl,
  title,
}) => {
  return (
    <li className='duration-300 hover:-translate-y-5 hover:shadow-lg'>
      <article className='flex h-full w-full lg:max-w-[348px] lg:flex-col'>
        <img
          src={imageUrl}
          alt=''
          className='hidden aspect-square w-full max-w-[200px] object-cover sm:block md:max-h-[330px] md:max-w-full'
        />
        <div
          className='rounded-xl p-8 sm:rounded-none lg:h-[50%]'
          style={{ background: bgColor }}
        >
          <h2 className='pb-5 text-center text-lg font-semibold text-white md:text-2xl'>
            {title}
          </h2>
          <p className='md:text-md text-center text-sm text-white'>
            {description}
          </p>
        </div>
      </article>
    </li>
  );
};

export default FeatureCard;
