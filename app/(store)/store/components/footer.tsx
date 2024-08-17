const Footer = () => {
  let year = new Date().getFullYear();
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black dark:text-gray-100">
          &copy; {year} Store, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
