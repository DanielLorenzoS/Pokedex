"use client";

import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import './page.css'
import CardPokemon from '../components/CardPokemon';
import listGlobal, { getListGlobal, setListGlobal } from '../globals';

export default function SavedPokemons() {
    const [pokemonDataList, setPokemonDataList] = useState([]); // Estado para la lista de Pokémon guardados
    const [list, setList] = useState(listGlobal); // Ejemplo de lista de Pokémon guardados

    useEffect(() => {
        console.log(list)
        const fetchData = async () => {
            const dataList = [];

            for (let i = 0; i < list.length; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${list[i]}`);
                const data = await response.json();
                dataList.push(data);
                console.log(data.id);
            }

            setPokemonDataList(dataList);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataList = [];

            for (let i = 0; i < list.length; i++) {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${list[i]}`);
                const data = await response.json();
                dataList.push(data);
                console.log(data.id);
            }

            setPokemonDataList(dataList);
        };

        fetchData();
    }, [list]);

    const handleRemovePokemon = (index) => {
        const newList = list.filter(pokemonId => pokemonId !== index);
        setList(newList);
        console.log(newList)
        setListGlobal(newList);
    };

    return (
        <>
            <Nav />
            {list.length === 0 ? (
                <h3 className="w-100 text-center">No tienes pokemons guardados</h3>
            ) : (
                <div className='w-100 card-container'>
                    {pokemonDataList.map((pokemonData, index) => (
                        <div className='w-25 m-auto d-flex flex-column'>
                            <CardPokemon
                                className="card"
                                key={pokemonData.id}
                                urlImage={pokemonData.sprites.other.dream_world.front_default}
                                nombre={pokemonData.name}
                                tipo={pokemonData.types[0].type.name}
                                habilidades={pokemonData.abilities.map(ability => ability.ability.name).join(', ')}
                            />
                            <button className="btnRemove btn btn-danger m-auto p-2 border border-1" onClick={() => handleRemovePokemon(pokemonData.id)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
