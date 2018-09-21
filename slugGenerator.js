const slugFormat = (title) => {
  let regex = / /gi;
  let slug = title.replace(regex, '-');
  return slug;
}

module.exports = slugFormat;
