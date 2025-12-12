export default function isBrowser() {

  console.log(typeof window !== 'undefined', typeof document !== 'undefined');
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}