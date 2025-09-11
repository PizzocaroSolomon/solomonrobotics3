
const Seo = ({ title, description }) => {
  const siteTitle = 'Consulting Pro';
  const defaultDescription = 'Professional consulting services to help your business grow and succeed.';
  
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const pageDescription = description || defaultDescription;

  // Check if react-helmet is available, otherwise use fallback
  if (typeof window !== 'undefined' && document) {
    document.title = pageTitle;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', pageDescription);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = pageDescription;
      document.getElementsByTagName('head')[0].appendChild(metaDescription);
    }
  }

  return null;
};

export default Seo;