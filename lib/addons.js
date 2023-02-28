function isMethodOfArray(callee) {
  let arrayMethods = ['concat', 'every', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'indexOf', 'join', 'lastIndexOf', 'map', 'pop', 'push', 'reduce', 'reduceRight', 'reverse', 'shift', 'slice', 'some', 'sort', 'splice', 'toLocaleString', 'toString', 'unshift'];
  return callee.type === 'MemberExpression' &&
    callee.object.type === 'Identifier' &&
    callee.object.name === 'Array' &&
    callee.property.type === 'Identifier' &&
    arrayMethods.includes(callee.property.name);
}


function generateArrayMethod(callee, args) {
  let methodMap = {
    'concat': 'concat',
    'every': 'all_of',
    'filter': 'filter',
    'find': 'find',
    'findIndex': 'find_index',
    'forEach': 'for_each',
    'includes': 'find',
    'indexOf': 'find_index',
    'join': 'join',
    'lastIndexOf': 'find_last_index',
    'map': 'map',
    'pop': 'pop_back',
    'push': 'push_back',
    'reduce': 'reduce',
    'reduceRight': 'reduce_right',
    'reverse': 'reverse',
    'shift': 'erase',
    'slice': 'slice',
    'some': 'any_of',
    'sort': 'sort',
    'splice': 'splice',
    'toLocaleString': 'to_string',
    'toString': 'to_string',
    'unshift': 'insert'
  };

  let methodName = methodMap[callee.property.name];
  let vectorArg = args ? generateCpp({ type: 'ArrayExpression', elements: ast.arguments }) : 'std::vector<>';
  return `${vectorArg}.${methodName}(${args})`;
}

function valueType(ast) {
  switch (ast.type) {
    case 'Literal':
      return ast.value === null ? 'std::nullptr_t' :
        typeof ast.value === 'string' ? 'std::string' :
          typeof ast.value === 'number' ? 'double' :
            typeof ast.value === 'boolean' ? 'bool' :
              'unsupported';
    case 'ArrayExpression':
      return `std::vector<${valueType(ast.elements[0])}>`;
    case 'ObjectExpression':
      return 'std::map<std::string, ' + valueType(ast.properties[0].value) + '>';
    default:
      return 'unsupported';
  }
}

function getCppType(jsType) {
  switch (jsType) {
    case 'string':
      return 'std::string';
    case 'number':
      return 'double';
    case 'boolean':
      return 'bool';
    case 'void':
      return 'void';
    case 'any':
      return 'auto';
    default:
      return jsType;
  }
}

function joinCppParts(mainBody = "", fcDefinitions = "", usedTypenames, includes = "") {
  return `
${includes}
${generateTemplates(usedTypenames)}

${fcDefinitions} 

int main(){
  ${mainBody}
  // If you want to pause the program at the end just uncomment line below
  // system("pause>0")
}  

`
}

function generateTypename() {
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  let typename = ""
  let len = 4
  while (typename.length < len) {
    typename += letters[Math.floor(Math.random() * letters.length)]
  }
  return typename
}

function generateTemplates(typenames) {
  let templates = "template < "
  for (let i = 0; i < typenames.length; ++i) {
    if (i == 0)
      templates += `typename ${typenames[i]}`
    else
      templates += `, typename ${typenames[i]}`
  }
  return templates + ">"
}



module.exports = { isMethodOfArray, generateArrayMethod, valueType, getCppType, joinCppParts, generateTypename }