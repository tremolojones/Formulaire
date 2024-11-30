import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import schema from './schemas/schema.json';
import uischema from './schemas/uischema.json';
import PercentageControl from './components/PercentageControl';
import CountryAutocomplete from './components/CountryAutocomplete';

// définition de la fonction de test pour le pourcentage
const percentageTester = (uischema: any, schema: any) => {
  return schema.type === 'number' && uischema.scope.endsWith('percentage') ? 4 : -1;
};

 // définition de la fonction de test pour le pays
const countryAutocompleteTester = (uischema: any, schema: any) => {
  return schema.type === 'string' && uischema.scope.endsWith('country') ? 4 : -1;
};

// liste de  du rendu des composants
const renderers = [
  ...materialRenderers,
  { tester: percentageTester, renderer: PercentageControl },
  { tester: countryAutocompleteTester, renderer: CountryAutocomplete }
];

// initialisation des donnéés 
const initialData = {
  name: '',
  countries: [
    { country: 'France', percentage: 50 },
    { country: 'Belgique', percentage: 20 },
    { country: 'Allemagne', percentage: 10 },
    { country: 'Inconnu', percentage: 20 }
  ]
};

const App = () => {
  const [data, setData] = useState(initialData);

  return (
    <div className="App">
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
     {/* Affiche les données JSON */}
    </div>
  );
};

export default App;


