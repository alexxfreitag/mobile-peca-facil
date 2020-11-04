import React, { useState } from 'react';
import StepIndicator from 'react-native-step-indicator';
import { Container, ViewStepIndicator, ViewFilter } from './styles';
import CardSelect from '../../../components/CardSelect';

// FontAwesomeIcon.loadFont();

export default function AutomobileType() {
  const [isPressed, setIsPressed] = useState(false);

  const labels = ['Automóveis', 'Marcas', 'Modelos'];
  const customStyles = {
    labelColor: '#fff',
    labelSize: 14,
    currentStepLabelColor: '#fff',
    stepStrokeCurrentColor: '#fff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelCurrentColor: '#d74d4d',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  };

  return (
    <Container>
      <ViewStepIndicator>
        <StepIndicator
          labels={labels}
          customStyles={customStyles}
          stepCount={3}
        />
      </ViewStepIndicator>
      <ViewFilter>
        <CardSelect
          isPressed={isPressed}
          onPress={() => setIsPressed(!isPressed)}
          iconName="car"
          textName="Carro"
        />
        <CardSelect
          isPressed={isPressed}
          onPress={() => setIsPressed(!isPressed)}
          iconName="motorcycle"
          textName="Moto"
        />
        <CardSelect
          isPressed={isPressed}
          onPress={() => setIsPressed(!isPressed)}
          iconName="truck"
          textName="Caminhão"
        />
      </ViewFilter>
    </Container>
  );
}
