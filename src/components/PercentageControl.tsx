
import React from 'react'; 
import { withJsonFormsControlProps, useJsonForms } from '@jsonforms/react'; 
import { TextField } from '@mui/material'; 

// Définition de l'interface pour les props du composant PercentageControl
interface PercentageControlProps {
  data: number; // La valeur actuelle du pourcentage
  handleChange: (path: string, value: any) => void; // Fonction de gestion des changements de valeur
  path: string; 
}

// Définition du composant PercentageControl
const PercentageControl: React.FC<PercentageControlProps> = ({ data, handleChange, path }) => {
  // Utilisation du hook useJsonForms pour accéder aux donnée
  const { core } = useJsonForms();
  const rootData = core?.data || {}; // Obtention des données racines
  const [error, setError] = React.useState<string | null>(null); //  messages d'erreur

  // Fonction pour valider que la somme des pourcentages est égale à 100%
  const validateTotalPercentage = (newValue: number) => {
    const totalPercentage = rootData.countries.reduce((total: number, item: any) => {
      return total + (item === data ? newValue : item.percentage); //  somme des pourcentages
    }, 0);

    if (totalPercentage !== 100) {
      setError('La somme des pourcentages doit être égale à 100%'); //  message d'erreur si la somme n'est pas 100%
    } else {
      setError(null); 
    }
  };

  // Gestion de changement pour le champ de saisie
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    if (value >= 0 && value <= 100) {
      handleChange(path, value); // Mise à jour 
      validateTotalPercentage(value); 
    } else {
      setError('Le pourcentage doit être entre 0 et 100'); 
    }
  };

  return (
    <div>
      <TextField
        type="number" 
        value={data || ''} 
        onChange={handleInputChange} 
        label="Pourcentage" 
        inputProps={{ min: "0", max: "100", step: "1" }} 
        error={!!error} 
        helperText={error} 
      />
    </div>
  );
};

// Export du composant avec les props JSONForms
export default withJsonFormsControlProps(PercentageControl);
