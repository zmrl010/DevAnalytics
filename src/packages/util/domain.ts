interface Validator {
  (c: string): boolean;
}

function escapeDots(s: string) {
  return s.replace('.', '//.');
}

function validate(re: RegExp, comparison: string) {
  return re.test(comparison);
}

function generateDomainRegex(domain: string) {
  const escapedDomain = escapeDots(domain);
  return new RegExp(`([a-z0-9A-Z]+${escapedDomain})`);
}

export function getDomainValidator(domain: string): Validator {
  const re = generateDomainRegex(domain);
  return (comparison: string): boolean => validate(re, comparison);
}
