"use client";

import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import './page.css'
import CardPokemon from '../components/CardPokemon';
import listGlobal, { getListGlobal, setListGlobal } from '../globals';
import Swal from 'sweetalert2';

export default function SavedPokemons() {
    const [pokemonDataList, setPokemonDataList] = useState([]); // Estado para la lista de Pokémon guardados
    const [list, setList] = useState(null); // Ejemplo de lista de Pokémon guardados

    useEffect(() => {
        const fetchData = async () => {

            const response = await fetch(`http://localhost:8000/pokemons`);
            const data = await response.json();
            let l = [];
            data.map(e => l.push(e.pokemon))
            console.log(l)
            setList(l)
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataList = [];

            if (list != null) {
                for (let i = 0; i < list.length; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${list[i]}`);
                    const data = await response.json();
                    dataList.push(data);
                }
            }

            setPokemonDataList(dataList);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const dataList = [];

            if (list != null) {
                for (let i = 0; i < list.length; i++) {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${list[i]}`);
                    const data = await response.json();
                    dataList.push(data);
                }
            }

            setPokemonDataList(dataList);
        };

        fetchData();
    }, [list]);

    const handleRemovePokemon = async (id, name) => {
        name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
        const confirmDelete = await Swal.fire({
            title: `¿Estás seguro de que deseas eliminar a ${name} de la Pokedex?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Cancelar',
        });

        if (confirmDelete.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8000/pokemons/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    Swal.fire({
                        title: `Se ha eliminado a ${name}`,
                        icon: 'success'
                    });

                    const fetchData = async () => {
                        const response = await fetch('http://localhost:8000/pokemons');
                        const data = await response.json();
                        let l = [];
                        data.map((e) => l.push(e.pokemon));
                        console.log(l);
                        setList(l);
                    };

                    fetchData();

                    console.log('Post deleted successfully:', data);
                } else {
                    console.log('Error deleting post:', response.status);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        } else {
            console.log('Operación cancelada.');
        }
    };



    return (
        <>
            <Nav />
            {list === null ? (
                <h3 className="w-100 text-center">Cargando...</h3>
            ) : list.length === 0 ? (
                <h3 className="w-100 text-center">No tienes pokemons guardados</h3>
            ) : (
                <div className='w-100 card-container'>
                    {pokemonDataList.map((pokemonData, index) => (
                        <div className='w-25 m-auto d-flex flex-column box' key={index}>
                            <CardPokemon
                                className="card"
                                urlImage={pokemonData.sprites.other.dream_world.front_default}
                                nombre={pokemonData.name}
                                tipo={pokemonData.types[0].type.name}
                                habilidades={pokemonData.abilities.map(ability => ability.ability.name).join(', ')}
                            />
                            <button className="btnRemove btn btn-danger m-auto mb-4 p-2 border border-1" onClick={() => handleRemovePokemon(pokemonData.id, pokemonData.name)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
