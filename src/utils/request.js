export default Request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (e) {
    alert(e.message);
  }
}