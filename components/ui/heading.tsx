interface HeadingProps {
  title: string;
  description: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, description }) => {
  return (
    <div className="space-y-2 text-center md:text-left">
      <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-base text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};
