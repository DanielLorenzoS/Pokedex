"use client";

import React, { useState, useEffect } from 'react';
import CardPokemon from "./CardPokemon";
import "./FetchPokemonStyle.css";
import listGlobal, { getListGlobal, setListGlobal } from '../globals';

export default function FetchPokemon() {

    const [number, setNumber] = useState(Math.floor(Math.random() * 20) + 1);
    const [pokemonData, setPokemonData] = useState(null);
    const [list, setList] = useState(listGlobal);

    const handleAddPokemon = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas agregar este Pokémon?');

        if (confirmDelete) {
            try {
                const response = await fetch('http://localhost:8000/pokemons', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                    body: JSON.stringify({ pokemon: id }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Post created successfully:', data);
                } else {
                    console.log('Error creating post:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            console.log('Operación cancelada.');
        }
    };


    function changeNumber() {
        const interval = setInterval(() => {
            setNumber(Math.floor(Math.random() * 20) + 1);

        }, 30000);

        return () => {
            clearInterval(interval);
        };
    }

    useEffect(() => {
        changeNumber()
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}`);
                const data = await response.json();
                setPokemonData(data);
                console.log(pokemonData.abilities)
            } catch (error) {

            }
        };

        fetchData();
    }, [number]);

    let handleSavePokemon = (id) => {
        setList(list.push(id))
        setListGlobal(list);
    }


    return (
        <>
            {pokemonData && (
                <>
                    <div className='row p-0 justify-content-center'>
                        <CardPokemon className='col-6 m-auto mb-3 card' urlImage={pokemonData.sprites.other.dream_world.front_default}
                            key={pokemonData.id}
                            nombre={pokemonData.name}
                            tipo={pokemonData.types[0].type.name}
                            habilidades={pokemonData.abilities.map(ability => ability.ability.name).join(', ')} />
                        <button className='btnSave bg-success text-white border border-1 col-12 btn m-auto mr-2 mt-4 w-50 p-3' onClick={() => handleAddPokemon(pokemonData.id)}>
                            Guardar Pokémon
                        </button>
                        <button className='btnShow col-12 btn m-auto ml-2 mt-4 w-75 p-3' onClick={() => { setNumber(Math.floor(Math.random() * 20) + 1) }}>
                            Mostrar Pokémon
                        </button>
                    </div>
                </>
            )}

        </>
    )
}