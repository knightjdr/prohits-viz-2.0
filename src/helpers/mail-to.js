const defaultSubject = 'ProHit-viz help';

const mailTo = (subject = defaultSubject, body) => {
  let mailToString = `mailto:contact@prohits-viz.org?subject=${subject}`;
  if (body) {
    mailToString += `&body=${body}`;
  }
  window.location.href = mailToString;
};
export default mailTo;
