"use client";

import React, { useState, useEffect } from 'react';
import CardPokemon from "./CardPokemon";
import "./FetchPokemonStyle.css";
import listGlobal, { getListGlobal, setListGlobal } from '../globals';
import Swal from 'sweetalert2';

export default function FetchPokemon() {

    const [number, setNumber] = useState(Math.floor(Math.random() * 20) + 1);
    const [pokemonData, setPokemonData] = useState(null);
    const [list, setList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`http://localhost:8000/pokemons`);
            const data = await response.json();
            let l = [];
            data.map(e => l.push(e.pokemon))
            setList(l)
        };

        fetchData();
    }, []);

    const handleAddPokemon = async (id, name) => {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

        const pokemonExists = list.some((e) => e === id);
        console.log(pokemonExists);

        if (pokemonExists) {
            Swal.fire({
                title: `${name} ya está en la lista.`,
                icon: 'info',
            });
            return;
        } else {
            const confirmDelete = await Swal.fire({
                title: `¿Estás seguro de que deseas agregar a ${name}?`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Agregar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmDelete.isConfirmed) {
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
                        Swal.fire({
                            title: `${name} añadido correctamente`,
                            icon: 'success',
                        });
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
            } catch (error) {

            }
        };

        fetchData();
    }, [number]);


    return (
        <>
            {pokemonData && (
                <>
                    <div className='row p-0 justify-content-center'>
                        <CardPokemon className='m-auto mb-3 card' urlImage={pokemonData.sprites.other.dream_world.front_default}
                            key={pokemonData.id}
                            nombre={pokemonData.name}
                            tipo={pokemonData.types[0].type.name}
                            habilidades={pokemonData.abilities.map(ability => ability.ability.name).join(', ')} />
                        <button className='btnSave bg-success text-white border border-1 col-12 btn m-auto mr-2 mt-4 w-50 p-3' onClick={() => handleAddPokemon(pokemonData.id, pokemonData.name)}>
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