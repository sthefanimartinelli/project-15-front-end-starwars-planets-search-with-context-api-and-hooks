import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { wait } from '@testing-library/user-event/dist/utils';
import testData from '../../cypress/mocks/testData';

describe('Testes envolvendo toda a aplicação', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue(
      { json: jest.fn().mockResolvedValue(testData) },
    );
  });
  // test('Testa o fecth à API', async () => {
  //   render(<App />);
  //   // wait(4000);
  //   // const tatooineEl = screen.findByRole('cell', { name: /tatooine/i });
  //   // expect(tatooineEl).toBeInTheDocument();
  //   // const row = screen.findAllByRole('row');
  //   // expect(row.length).toBe(11);

  //   // await waitFor(() => {
	// 	// 	const row = screen.findAllByRole('row');
	// 	// 	expect(row.length).toEqual(11);
	// 	// }, { timeout: 4000 })

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

  test('Testa os casos de filtragem envolvendo o filtro de comparação', async () => {
    render(<App/>);

    await waitFor(() => {
			expect(screen.getByRole('cell', {name: /tatooine/i})).toBeInTheDocument();
		}, { timeout: 4000 })

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const btnFilter = screen.getByTestId('button-filter');
    const valueFilter = screen.getByTestId('value-filter');


    userEvent.selectOptions(columnFilter, 'population');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.clear(valueFilter)
    userEvent.type(valueFilter, '200000');
    userEvent.click(btnFilter);
    expect(screen.getByRole('cell', {name: /alderaan/i})).toBeInTheDocument();
  });
});
