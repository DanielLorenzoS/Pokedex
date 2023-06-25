"use client";

import React, { useEffect, useState } from 'react'
import Nav from '../nav/Nav'
import './page.css'
import CardPokemon from '../components/CardPokemon';
import listGlobal, { getListGlobal, setListGlobal } from '../globals';
import Swal from 'sweetalert2';

export default function SavedPokemons() {
    const [pokemonDataList, setPokemonDataList] = useState([]); 
    const [list, setList] = useState(null); 
    let url = 'https://pokedexspring-production.up.railway.app';

    useEffect(() => {
        console.log("cargando...")
        const fetchData = async () => {

            const response = await fetch(url);
            const data = await response.json();
            console.log(data)
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
                const response = await fetch(`${url}/${id}`, {
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
                        const response = await fetch(url);
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
                <h3 className="txt">Cargando...</h3>
            ) : list.length === 0 ? (
                <h3 className="txt">No tienes pokemons guardados</h3>
            ) : (
                <div className='cardcontainer'>
                    {pokemonDataList.map((pokemonData, index) => (
                        <div className='box' key={index}>
                            <CardPokemon
                                urlImage={pokemonData.sprites.other.dream_world.front_default}
                                nombre={pokemonData.name}
                                tipo={pokemonData.types[0].type.name}
                                habilidades={pokemonData.abilities.map(ability => ability.ability.name).join(', ')}
                            />
                            <button className="btnRemove" onClick={() => handleRemovePokemon(pokemonData.id, pokemonData.name)}>
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
