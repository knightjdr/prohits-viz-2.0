const defaultSubject = 'ProHit-viz help';

const MailTo = (subject = defaultSubject) => {
  window.location.href = `mailto:contact@prohits-viz.org?subject=${subject}`;
};
export default MailTo;
