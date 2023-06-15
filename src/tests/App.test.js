import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

describe('Testes envolvendo toda a aplicação', () => {
  // Mock dos dados da API
  // beforeEach(() => {
  //   jest.spyOn(global, 'fetch').mockResolvedValue(
  //     { json: jest.fn().mockResolvedValue(testData) },
  //   );
  // });

  test('Testa os elementos de filtragem presentes na página', () => {
    render(<App />);

    const nameFilter = screen.getByTestId('name-filter');
    expect(nameFilter).toBeInTheDocument();

    const columnFilter = screen.getByTestId('column-filter');
    expect(columnFilter).toBeInTheDocument();

    const comparisonFilter = screen.getByTestId('comparison-filter');
    expect(comparisonFilter).toBeInTheDocument();

    const valueFilter = screen.getByTestId('value-filter');
    expect(valueFilter).toBeInTheDocument();

    const btnFilter = screen.getByTestId('button-filter');
    expect(btnFilter).toBeInTheDocument();

    const columnSortFilter = screen.getByTestId('column-sort');
    expect(columnSortFilter).toBeInTheDocument();

    const ascRadionBtn = screen.getByText(/ascendente/i);
    expect(ascRadionBtn).toBeInTheDocument();
    
    const descRadionBtn = screen.getByText(/descendente/i);
    expect(descRadionBtn).toBeInTheDocument();

    const sortBtn = screen.getByTestId('column-sort-button');
    expect(sortBtn).toBeInTheDocument();

    const removeAllFilterBtn = screen.getByTestId('button-remove-filters');
    expect(removeAllFilterBtn).toBeInTheDocument();
    
  });

  test('Testa os casos de filtragem envolvendo os filtros de comparação', async () => {
    render(<App/>);

    await waitFor(() => {
			expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();
		}, { timeout: 4000 })

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const valueFilter = screen.getByTestId('value-filter');

    userEvent.click(btnFilter);
    expect(screen.getByRole('cell', {name: /alderaan/i})).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.click(btnFilter);

    userEvent.selectOptions(columnFilter, 'orbital_period');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '463');
    userEvent.click(btnFilter);
    expect(screen.getByRole('cell', {name: /naboo/i})).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '1');
    userEvent.click(btnFilter);
    expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();

  });

  test('Testa o caso de filtrar com uma opção da coluna, e ela não ficar disponível novamente', async () => {
    render(<App/>);

    await waitFor(() => {
      expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();
		}, { timeout: 4000 });

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const valueFilter = screen.getByTestId('value-filter');


    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '200000');
    userEvent.click(btnFilter);
    const view = screen.getByText(/coluna/i);
    expect(within(view).getByDisplayValue(/orbital_period/i)).toBeInTheDocument();

  });

  test('Testa o sort', async () => {
    render(<App/>);

    await waitFor(() => {
      expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();
		}, { timeout: 4000 });

    const columnSortFilter = screen.getByTestId('column-sort');
    const ascFilter = screen.getByRole('radio', {name: /ascendente/i});
    const descFilter = screen.getByRole('radio', {name: /descendente/i});
    const sortBtn = screen.getByRole('button', {name: /ordenar/i});

    userEvent.click(sortBtn);

    userEvent.selectOptions(columnSortFilter, 'population');
    userEvent.click(ascFilter);
    userEvent.click(sortBtn);
    
    userEvent.selectOptions(columnSortFilter, 'orbital_period');
    userEvent.click(descFilter);
    userEvent.click(sortBtn);

  });
});
