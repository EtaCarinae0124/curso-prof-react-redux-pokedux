import { useEffect} from 'react';
// import { connect } from 'react-redux';
import { Col, Spin } from 'antd';
import Searcher from './components/Searcher';
import PokemonList from './components/PokemonList';
// import { getPokemon } from './api';
// import { getPokemonsWithDetails, setLoading } from './actions';
import logo from './statics/logo.svg';
import './App.css';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { fetchPokemonWithDetails } from './slices/dataSlice';

function App() {
  // const [pokemons, setPokemons] = useState([]);
  // const pokemons = useSelector((state) => state.getIn(['data', 'pokemons'], shallowEqual)).toJS();
  const pokemons = useSelector((state) => state.data.pokemons, shallowEqual);
  // const loading = useSelector((state) => state.ui.loading(['ui', 'loading']));
  const loading = useSelector((state) => state.ui.loading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPokemonWithDetails());
  }, []);
  
  return (
    <div className='App'>
      <Col span={4} offset={10}>
        <img src={logo} alt='Pokedux' />
      </Col>
      <Col span={8} offset={8}>
        <Searcher />
      </Col>
      {loading ? <Col offset={12}>
        <Spin spinning size='large' />
      </Col> : (
      <PokemonList pokemons={pokemons} />
      )}
      
    </div>
  );
};

// const mapStateToProps = (state => ({
//   pokemons: state.pokemons,
// }))

// const mapDispatchToProps = (dispatch) => ({
//   setPokemons: (value) => dispatch(setPokemonsActions(value))
// });

export default App;