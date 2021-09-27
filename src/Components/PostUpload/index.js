import styled from 'styled-components'

export const Layout = styled.div`
    height: 100%;
    width: 100%;

    display: grid;
    place-items: center;

   
`

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 36px 48px;
    border:1px solid black;
    border-radius: 20px;
    text-align: center;

    p {
        margin-top: -10px;
        color: #777;
    }
`

export const BoxUpload = styled.div`
    display: grid;
    margin-top: 20px;
    place-items: center;
    // border: 1px dashed black;
    /* padding: 36px 48px; */
    position: relative;
    // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    height: 250px;
    width: 350px;
    // background: #FBFBFF;
    // border-radius: 20px;

    .image-upload {
        display: flex;
        flex-wrap:wrap;

        label {
            cursor: pointer;
        
            :hover {
                opacity: .8;
            }
        }

        >input {
            display: none;
        }
    }
`

export const ImagePreview = styled.div`
    position: relative;
    height: 250px;
    width: 350px;
    overflow: hidden;
    border: 1px dashed black;
    border-radius: 30px;
    box-shadow: rgb(50 50 93 / 25%) 0px 50px 100px -20px, rgb(0 0 0 / 30%) 0px 30px 60px -30px;
    background: #FBFBFF;
    /* cursor: pointer; */

    #uploaded-image{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .close-icon{
        background: #000;
        border-radius: 5px;
        opacity: .8;

        position: absolute;
        z-index: 10;
        right: 15px;
        top: 20px;
        cursor: pointer;

        :hover {
            opacity: 1;
        }   
    }
`