const paleta = {
  textField: {
    text: '#657381',
    textBlack: '#33404E',
    backgroundColor: '#F5F8FA',
    backgroundColorHover: '#EEF3F7',
    backgroundColorDisabled: '#EAF0F6',
    error: '#e74c3c',
    border: '#E1E7ED',
  },
  bar: {
    primary: '#003366',
    secondary: '#4B5D6E',
    border: 'rgba(36, 36, 36, 0.1)',
    icono: '#33404E',
    iconoBorder: '#E9EEFA',
    user: '#409A8E',
    elements: '#8CA0B6',
    details: '#EBEFF2',
    point: '#BAB6B6',
    pronostico: '#E9EEFA',
  },
  sidebar: {
    active: '#EAF0F6',
    backgroundColor: '#FFF',
  },
  activo: {
    primary: '#7C98B6',
    pronostico: '#2053d2'
  },
  tabla: {
    bordertd: '#CBD6E2',
    rowError: '#ffbaba',
  },
  geocerca: {
    primary: '#0073e6',
    secondary: '#B60606',
    tertiary: '#FFF826',
    container: '#707070',
  },
  graficos: {
    barPrimary: '#fa6385',
    barSelected: '#48affa',
    dataLabel: '#2e323a',
    dataLabelText: '#dedfe0',
    linePrimary: '#fcc235',
    lineSecondary: '#4cc0c0',
    lineTertiary: '#fb9f40',
  },
  configuraciones: {
    rojo: 'hsl(347, 100%, 63%)',
    amarillo: 'hsl(42, 100%, 60%)',
    verde: 'hsl(180, 70%, 48%)',    
    gris: 'hsl(0, 0%, 67%)',
    disabled: '#DFE5EA',
    texto: '#4B5D6E',
  },
  changeOpacity: (hslStr, opactity) => {
    const arr = hslStr.match(/\d+/g)?.map(Number);
    if (!arr) return hslStr;
    const [hue, saturation, lightness] = arr;
    const hslObject = { hue, saturation, lightness };
    hslObject.lightness = opactity;
    return `hsl(${hslObject.hue}, ${hslObject.saturation}%, ${hslObject.lightness}%)`;
  },
  rangos: (color) => {
    if(color === 'rojo') return 'hsl(347, 100%, 63%)';
    if(color === 'amarillo') return 'hsl(42, 100%, 60%)';
    if(color === 'verde') return 'hsl(180, 70%, 48%)';
    return '#7F8A95';
  },
};

export default paleta;
