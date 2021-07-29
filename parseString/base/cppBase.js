const cppBase = (includes, functions, intoMain) => {
  return `${includes}

${functions}

int main(){
  ${intoMain}
  // If you want to pause the program at the end just uncomment line below
  // system("pause>0")
};
`;
};

module.exports = cppBase;
