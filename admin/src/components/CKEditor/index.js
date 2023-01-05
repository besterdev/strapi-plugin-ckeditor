import React, {useEffect, useRef, useState} from "react";
import {auth, prefixFileUrlWithBackendUrl, request} from "@strapi/helper-plugin";
import styled, {createGlobalStyle} from "styled-components";

import {Box} from "@strapi/design-system/Box";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import {Editor as CustomClassicEditor} from "./build/ckeditor";
import MediaLib from "../MediaLib";
import PropTypes from "prop-types";
import pluginId from "../../pluginId";
import styles from "./styles";
import theme from "./theme";

const EditorStyle = createGlobalStyle`
${styles}
${({ strapiTheme }) => strapiTheme}
${({ custom }) => custom}

.ck-editor__styled__container{
	position: relative;
	width:100%;
}
`;
const Wrapper = styled(Box)``;

const Editor = ({ onChange, name, value, disabled }) => {
  //####### strapi media lib connector #############################################################################################
  const [mediaLibVisible, setMediaLibVisible] = useState(false);
  const [editor, setEditor] = useState();

  const toggleMediaLib = (editor) => {
    if (editor) {
      setEditor(editor);
    }
    setMediaLibVisible((prev) => !prev);
  };

  const handleChangeAssets = (assets) => {
    let newValue = "";

    assets.map((asset) => {
      if (asset.mime.includes("image")) {
        if (asset.formats && uploadCfg?.responsiveDimensions) {
          let set = "";
          let keys = Object.keys(asset.formats).sort((a, b) => {
            return asset.formats[a].width - asset.formats[b].width;
          });
          keys.map((k) => {
            let str = prefixFileUrlWithBackendUrl(asset.formats[k].url) + ` ${asset.formats[k].width}w,`;
            set = set + str;
          });
          const imgTag = `<img src="${asset.url}" alt="${asset.alt}" srcset="${set}"></img>`;
          newValue = `${newValue}${imgTag}`;
        } else {
          const imgTag = `<img src="${asset.url}" alt="${asset.alt}"></img>`;
          newValue = `${newValue}${imgTag}`;
        }
      }
      // Handle videos and other type of files by adding some code
    });

    const viewFragment = editor.data.processor.toView(newValue);
    const modelFragment = editor.data.toModel(viewFragment);
    editor.model.insertContent(modelFragment);

    toggleMediaLib();
  };

  const requestConfig = (key) =>
      request(`/${pluginId}/config/${key}`, { method: "GET" });

  const requestEditorConfigJs = async () => {
    const url = strapi.backendURL !== '/'
        ? `${strapi.backendURL}/${pluginId}/editor-config-script`
        : `/${pluginId}/editor-config-script`

    // Can't use `request` helper, because it is hardcoded to try to convert response to JSON
    const response = await fetch(`/${pluginId}/editor-config-script`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.getToken()}` },
    });

    return await response.text();
  }

  const insertConfigScript = (jsCode) => {
    var script = document.createElement('script');
    script.textContent = jsCode;
    document.body.appendChild(script);
  }

  const waitForConfigToInitialize = async () => {
    return new Promise((resolve) => {
      (function checkConfigLoaded() {
        if (globalThis.ckEditorConfig) {
          resolve(globalThis.ckEditorConfig)
        } else
          setTimeout(checkConfigLoaded, 5)
      })();
    });
  }

  const getEditorConfig = async () => {
    const editorConfigJs = await requestEditorConfigJs();

    // raw config/ckeditor.[js|ts] file
    // Can be used with non-JSON serializable properties
    if(editorConfigJs) {
      insertConfigScript(editorConfigJs);
      return waitForConfigToInitialize();
    }

    // ckeditor snippet of config/plugins.[js|ts] serialized as JSON
    // Can't be used with non-JSON serializable properties
    else {
      return requestConfig('editor');
    }
  }


  //####### config #############################################################################################
  const [config, setConfig] = useState();
  const [pluginCfg, setPluginCfg] = useState({});
  const [uploadCfg, setUploadCfg] = useState();
  const uploadUrl = `${prefixFileUrlWithBackendUrl("/upload")}`;
  const headers = { Authorization: "Bearer " + auth.getToken() };
  useEffect(() => {
    // load the editor config
    (async () => {
      const editor = await getEditorConfig();
      const plugin = await requestConfig('plugin');
      const upload = await requestConfig('uploadcfg');


      //read i18n locale
      const urlSearchParams = new URLSearchParams(window.location.search);
      const params = Object.fromEntries(urlSearchParams.entries());
      const languageContent = params["plugins[i18n][locale]"];

      if (editor) {
        //set locale language code to content
        let language = editor.language;
        if (languageContent) {
          const countryCode = languageContent.split("-")[0]
          if (countryCode && language)
            language = {
              content: language.content || countryCode,
              ui: typeof language === "string" && language || language.ui || auth.getUserInfo().preferedLanguage,
              textPartLanguage: language.textPartLanguage
            }
        }
        setConfig({
          ...config,
          editor: {
            ...editor,
            language: language ? language : auth.getUserInfo().preferedLanguage,
            strapiMediaLib: {
              onToggle: toggleMediaLib,
              label: "Media library",
            },
            strapiUpload: {
              uploadUrl,
              headers,
            },
          },
        });

        if (editor.language) {
          if (editor.language.ui) {
            import(/* webpackMode: "eager" */ `./build/translations/${editor.language.ui}.js`).catch(() => null);
          }
          if (editor.language.content) {
            import(/* webpackMode: "eager" */ `./build/translations/${editor.language.content}.js`).catch(() => null);
          }
          if (typeof editor.language !== "object") {
            import(/* webpackMode: "eager" */ `./build/translations/${editor.language}.js`).catch(() => null);
          }
        }
        if (!editor.language) {
          import(/* webpackMode: "eager" */ `./build/translations/${auth.getUserInfo().preferedLanguage}.js`).catch(() => null);
        }
      }
      if (plugin) {
        setPluginCfg({
          ...pluginCfg,
          ...plugin,
        });
        if (plugin.setAttribute !== false && localStorage.getItem("STRAPI_THEME")) {
          document.documentElement.setAttribute("data-theme", localStorage.getItem("STRAPI_THEME"));
        }
      }
      if (upload) {
        setUploadCfg({
          ...uploadCfg,
          ...upload,
        });
      }
    })();

    return () => { };
  }, []);

  //###########################################################################################################
  const wordCounter = useRef(null);
  return (
    <Wrapper className="ck-editor__styled__container" ref={wordCounter}>
      <EditorStyle custom={pluginCfg.styles} strapiTheme={pluginCfg.strapiTheme !== false ? theme : ""} />
      {config && (
        <CKEditor
          editor={CustomClassicEditor}
          disabled={disabled}
          data={value || ""}
          onReady={(editor) => {
            editor.setData(value || "")
            if(editor.config.get( 'removePlugins' ).includes("WordCount")===false){
              const wordCountPlugin = editor.plugins.get( 'WordCount' );
              const wordCountWrapper = wordCounter.current
              wordCountWrapper.appendChild( wordCountPlugin.wordCountContainer );
            }
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            onChange({ target: { name, value: data } });
          }}
          config={config?.editor}
        />
      )}
      <div style={{zIndex:5}}>
        <MediaLib isOpen={mediaLibVisible} onChange={handleChangeAssets} onToggle={toggleMediaLib} />
      </div>
    </Wrapper>
  );
};

Editor.defaultProps = {
  value: "",
  disabled: false,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Editor;
